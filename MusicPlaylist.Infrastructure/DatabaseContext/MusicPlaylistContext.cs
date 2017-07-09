using MusicPlaylist.Core.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.DatabaseContext
{
    public class MusicPlaylistContext : DbContext
    {
        public DbSet<Authenticator> Authenticators { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<Song> Songs { get; set; }

        public MusicPlaylistContext() : base("name=MusicPlaylistConnection")
        {

        }
    }
}
