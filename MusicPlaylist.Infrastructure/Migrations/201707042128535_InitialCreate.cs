namespace MusicPlaylist.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Authenticators",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Tag = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Playlists",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        AuthenticatorId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Authenticators", t => t.AuthenticatorId, cascadeDelete: true)
                .Index(t => t.AuthenticatorId);
            
            CreateTable(
                "dbo.Songs",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Url = c.String(nullable: false),
                        Provider = c.String(nullable: false),
                        PlaylistId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Playlists", t => t.PlaylistId, cascadeDelete: true)
                .Index(t => t.PlaylistId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Songs", "PlaylistId", "dbo.Playlists");
            DropForeignKey("dbo.Playlists", "AuthenticatorId", "dbo.Authenticators");
            DropIndex("dbo.Songs", new[] { "PlaylistId" });
            DropIndex("dbo.Playlists", new[] { "AuthenticatorId" });
            DropTable("dbo.Songs");
            DropTable("dbo.Playlists");
            DropTable("dbo.Authenticators");
        }
    }
}
