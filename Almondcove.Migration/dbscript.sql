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
CREATE OR ALTER PROCEDURE usp_AddMessage
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

CREATE OR ALTER PROCEDURE dbo.usp_SignUpUser
    @Username        NVARCHAR(64),
    @FirstName       NVARCHAR(64),
    @LastName        NVARCHAR(64) = NULL,
    @Email           NVARCHAR(256),
    @PasswordHash    NVARCHAR(256),
    @Result          INT OUTPUT
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
        (Id, Username, PasswordHash, FirstName, LastName, Email)
    VALUES 
        (@MaxId, @Username, @PasswordHash, @FirstName, @LastName, @Email);

    -- Set the new user's Id as the result
    SET @Result = @MaxId;
END
GO


-- usp_GetUsers

CREATE PROCEDURE dbo.usp_GetUsers
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Id,
        Username,
        FirstName,
        LastName,
        Email,
        DateCreated,
        Slug
    FROM 
        Users
END
