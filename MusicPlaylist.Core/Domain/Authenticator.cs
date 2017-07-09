using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Domain
{
    public class Authenticator
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Tag { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Playlist> Playlists { get; set; }

        public Authenticator()
        {

        }

        public Authenticator(string tag)
        {
            Id = Guid.NewGuid();
            Tag = tag;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
