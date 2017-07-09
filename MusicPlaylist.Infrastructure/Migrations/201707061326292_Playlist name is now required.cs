namespace MusicPlaylist.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Playlistnameisnowrequired : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Playlists", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Playlists", "Name", c => c.String());
        }
    }
}
