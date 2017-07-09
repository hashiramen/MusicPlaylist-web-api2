using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Domain
{
    public class Playlist
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Song> Songs { get; set; }
        public Guid AuthenticatorId { get; set; }
        public Authenticator Authenticator { get; set; }

        public Playlist()
        {

        }

        public Playlist(string name, Guid authenticatorId)
        {
            Id = Guid.NewGuid();
            Name = name;
            AuthenticatorId = authenticatorId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
