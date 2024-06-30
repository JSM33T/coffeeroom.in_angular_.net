--=====================================================================
--tblMessages
DROP TABLE IF EXISTS tblMessages
DROP TABLE IF EXISTS tblUsers
DROP TABLE IF EXISTS tblRoles
DROP TABLE IF EXISTS tblAvatars

--=====================================================================
--schema
CREATE TABLE [dbo].tblMessages (
    Id          INT PRIMARY KEY,
    [Name]      NVARCHAR(64),
    Mail        NVARCHAR(128),
    [Message]   NVARCHAR(512),
    Topic       NVARCHAR(64) NOT NULL DEFAULT ('general'),
    Origin      NVARCHAR(256) NOT NULL,
    UserAgent   NVARCHAR(512) NOT NULL,
    DateAdded   DATETIME DEFAULT (GETDATE())

	CONSTRAINT UQ_Mail_Message UNIQUE (Mail, [Message])
);
GO
-- sp_ADD
CREATE OR ALTER PROCEDURE dbo.usp_AddMessage
    @Name NVARCHAR(128),
    @Mail NVARCHAR(128),
    @Message NVARCHAR(512),
    @Topic NVARCHAR(128),
    @Origin NVARCHAR(256),
    @UserAgent NVARCHAR(512),
    @DateAdded DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM tblMessages WHERE Mail = @Mail AND [Message] = @Message)
    BEGIN
        SELECT 0;
        RETURN;
    END

    DECLARE @NewId INT;
    SELECT @NewId = ISNULL(MAX(Id), 0) + 1 FROM tblMessages;

    INSERT INTO tblMessages (Id, Name, Mail, Message, Topic, Origin, UserAgent, DateAdded)
    VALUES (@NewId, @Name, @Mail, @Message, @Topic, @Origin, @UserAgent, @DateAdded);

    SELECT @NewId;
END
GO


--=====================================================================
--tblRoles
--=====================================================================
--schema
CREATE TABLE [dbo].tblRoles (
    Id				INT PRIMARY KEY,
    [Name]			NVARCHAR(64),
	Slug			NVARCHAR(64),
    [Description]   NVARCHAR(128),
    DateAdded		DATETIME DEFAULT (GETDATE())

	CONSTRAINT UQ_tblRoles_Role UNIQUE (Slug)
);
GO
-- seeding
INSERT INTO [dbo].tblRoles (Id, [Name], Slug, [Description], DateAdded)
VALUES 
    (1, 'User', 'user', 'Standard user role', GETDATE()),
    (2, 'Author', 'author', 'Content author role', GETDATE()),
    (3, 'Admin', 'admin', 'Administrator role', GETDATE());
GO

--=====================================================================
--tblAvatars
--=====================================================================
CREATE TABLE [dbo].tblAvatars (
    Id				INT PRIMARY KEY,
    [Name]			NVARCHAR(64),
	Slug			NVARCHAR(64),
    [Description]   NVARCHAR(128),
    DateAdded		DATETIME DEFAULT (GETDATE())

	CONSTRAINT UQ_tblAvatars_Slug UNIQUE (Slug)
);
GO

--seeding
INSERT INTO [dbo].tblAvatars (Id, [Name], Slug, [Description], DateAdded)
VALUES (1, 'Default', 'default', 'Default avatar', GETDATE());
GO

--=====================================================================
--tblUsers
--=====================================================================
CREATE TABLE [dbo].tblUsers (
    Id              INT PRIMARY KEY,
    Username        NVARCHAR(64),
    PasswordHash    NVARCHAR(256),
    Email           NVARCHAR(128),
    FirstName       NVARCHAR(64),
    LastName        NVARCHAR(64),

	OTP				INT,
	OTPTime			DATETIME,
    IsActive        BIT					NOT NULL	DEFAULT 1,
    IsVerified      BIT					NOT NULL	DEFAULT 0,

    AvatarId        INT					NOT NULL	DEFAULT(1),
    RoleId          INT					NOT NULL	DEFAULT(1),
	[Key]			UNIQUEIDENTIFIER	NOT NULL	DEFAULT(NEWID()),

    DateAdded       DATETIME			NOT NULL	DEFAULT (GETDATE()),
	DateEdited      DATETIME			NOT NULL	DEFAULT (GETDATE()),

	CONSTRAINT	UQ_tblUsers_Username	UNIQUE		(Username),
	CONSTRAINT	UQ_tblUsers_Email		UNIQUE		(Email),
    CONSTRAINT	FK_tblUsers_Avatar		FOREIGN KEY (AvatarId)	REFERENCES tblAvatars(Id),
    CONSTRAINT	FK_tblUsers_Role		FOREIGN KEY (RoleId)	REFERENCES tblRoles(Id)
);
GO


-- usp_SignUpUser 'jsm33t','Jasmeet' ,'','jskainthofficial@gmail.com','asfhdkfjhasdkjlfhldjk'

USE [almondcove_db]
GO
/****** Object:  StoredProcedure [dbo].[usp_SignUpUser]    Script Date: 30-06-2024 9.10.53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- usp_SignUpUser 'jsm33t','Jasmeet' ,'','jskainthofficial@gmail.com','asfhdkfjhasdkjlfhldjk'

ALTER   PROCEDURE [dbo].[usp_SignUpUser]
    @Username			NVARCHAR(64),
    @FirstName			NVARCHAR(64),
    @LastName			NVARCHAR(64) = NULL,
    @Email				NVARCHAR(256),
    @PasswordHash		NVARCHAR(256),
	@OTP				INT,
    @Result				INT OUTPUT
AS
BEGIN
    DECLARE @MaxId INT;

    IF EXISTS (SELECT 1 FROM dbo.tblUsers WHERE Username = @Username)
    BEGIN
        SET @Result = 0;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM dbo.tblUsers WHERE Email = @Email)
    BEGIN
        SET @Result = -1;
        RETURN;
    END

    SELECT @MaxId = ISNULL(MAX(Id), 0) + 1 FROM dbo.tblUsers;

    INSERT INTO dbo.tblUsers 
        (Id, Username, PasswordHash, FirstName, LastName, Email,OTP,OTPTime)
    VALUES 
        (@MaxId, @Username, @PasswordHash, @FirstName, @LastName, @Email,@OTP,GETDATE());

    -- Set the new user's Id as the result
    SET @Result = @MaxId;
END
GO

-- usp_GetUsers

USE [almondcove_db]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetUserClaims]    Script Date: 29-06-2024 11.31.41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[usp_GetUserClaims]
    @Username NVARCHAR(64),
    @Password NVARCHAR(256), -- Assuming you hash the password before passing it to the SP
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT;

    SELECT 
        @UserId = Id
    FROM 
        dbo.tblUsers
    WHERE 
        Username = @Username 
        AND PasswordHash = @Password; -- Hash comparison

    IF @UserId IS NULL
    BEGIN
        -- No user found
        SET @Result = 0;
        RETURN;
    END

    SET @Result = 1;

    SELECT 
        u.Id,
        u.Username,
        u.Email,
        u.FirstName,
        u.LastName,
        u.IsActive,
        u.IsVerified,
        u.AvatarId,
        u.RoleId,
        u.DateAdded,
        u.DateEdited,
        r.Slug AS Role
    FROM 
        dbo.tblUsers u
    INNER JOIN 
        dbo.tblRoles r ON u.RoleId = r.Id
    WHERE 
        u.Id = @UserId AND
        u.IsVerified = 1 AND
        u.IsActive = 1
        ;
END

GO


CREATE OR ALTER PROCEDURE dbo.usp_VerifyUser
    @Email NVARCHAR(128),
    @OTP INT,
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT;
    DECLARE @IsVerified BIT;
    DECLARE @OTPCreatedAt DATETIME;

    -- Check if user exists
    SELECT @UserId = Id, @IsVerified = IsVerified, @OTPCreatedAt = OTPTime
    FROM tblUsers
    WHERE Email = @Email;

    IF @UserId IS NULL
    BEGIN
        SET @Result = -1; -- User does not exist
        RETURN;
    END

    -- Check if user is already verified
    IF @IsVerified = 1
    BEGIN
        SET @Result = -2; -- User already verified
        RETURN;
    END

    -- Check if OTP is expired (assuming OTP expires in 15 minutes)
    IF DATEADD(MINUTE, 15, @OTPCreatedAt) < GETDATE()
    BEGIN
        SET @Result = -3; -- OTP expired
        RETURN;
    END

    -- Check if OTP matches
    IF EXISTS (
        SELECT 1
        FROM tblUsers
        WHERE Email = @Email AND OTP = @OTP
    )
    BEGIN
        -- Update the user as verified
        UPDATE tblUsers
        SET IsVerified = 1
        WHERE Id = @UserId;

        SET @Result = 1; -- User verified successfully
    END
    ELSE
    BEGIN
        SET @Result = -4; -- Invalid OTP
    END
END
