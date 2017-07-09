namespace MusicPlaylist.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModelreworkedPlaylistandSong : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Songs", "CreatedAt", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Songs", "CreatedAt");
        }
    }
}
