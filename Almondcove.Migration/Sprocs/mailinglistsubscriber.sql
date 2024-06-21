CREATE TABLE [dbo].MailingListSubscribers (
    Id          INT PRIMARY KEY,
    [Name]      NVARCHAR(128),
    Mail        NVARCHAR(128),
    [Message]   NVARCHAR(512),
    Topic       NVARCHAR(128) NOT NULL DEFAULT ('general'),
    Origin      NVARCHAR(256) NOT NULL,
    UserAgent   NVARCHAR(512) NOT NULL,
    DateAdded   DATETIME DEFAULT (GETDATE())

	CONSTRAINT UQ_Mail_Message UNIQUE (Mail, [Message])
);
GO

CREATE OR ALTER PROCEDURE AddMailingListSubscriber
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

    IF EXISTS (SELECT 1 FROM MailingListSubscribers WHERE Mail = @Mail AND [Message] = @Message)
    BEGIN
        SELECT 0;
        RETURN;
    END

    DECLARE @NewId INT;
    SELECT @NewId = ISNULL(MAX(Id), 0) + 1 FROM MailingListSubscribers;

    INSERT INTO MailingListSubscribers (Id, Name, Mail, Message, Topic, Origin, UserAgent, DateAdded)
    VALUES (@NewId, @Name, @Mail, @Message, @Topic, @Origin, @UserAgent, @DateAdded);

    SELECT @NewId;
END
GO

