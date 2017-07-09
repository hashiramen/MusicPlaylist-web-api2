namespace MusicPlaylist.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ReworkedPlaylistclass : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Playlists", "Name", c => c.String());
            AddColumn("dbo.Playlists", "CreatedAt", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Playlists", "CreatedAt");
            DropColumn("dbo.Playlists", "Name");
        }
    }
}
