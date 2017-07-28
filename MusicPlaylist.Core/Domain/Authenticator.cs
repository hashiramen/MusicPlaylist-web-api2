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
            ValidateAndSetTag(tag);
            CreatedAt = DateTime.UtcNow;
        }

        public void ValidateAndSetTag(string tag)
        {
            if (tag == null)
            {
                throw new ArgumentNullException("Tag cannot be NULL");
            }

            if (String.IsNullOrWhiteSpace(tag))
            {
                throw new ArgumentException($"Invalid tag name");
            }

            Tag = tag;
        }
    }
}
