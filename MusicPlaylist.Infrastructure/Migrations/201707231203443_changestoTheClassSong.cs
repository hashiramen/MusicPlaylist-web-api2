namespace MusicPlaylist.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changestoTheClassSong : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Songs", "Unique", c => c.String());
            AddColumn("dbo.Songs", "Title", c => c.String());
            AddColumn("dbo.Songs", "Author", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Songs", "Author");
            DropColumn("dbo.Songs", "Title");
            DropColumn("dbo.Songs", "Unique");
        }
    }
}
