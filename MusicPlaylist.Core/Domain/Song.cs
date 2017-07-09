using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Domain
{
    public class Song
    {
        [Key]
        public Guid Id { get; protected set; }
        [Required]
        public string Url { get; protected set; }
        [Required]
        public string Provider { get; protected set; }
        public Guid PlaylistId { get; protected set; }
        public Playlist Playlist { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        public Song()
        {

        }

        public Song(string url, Guid playlistId)
        {
            Id = Guid.NewGuid();
            Url = url;
            //set url provider
            GetUrlProvider(url);
            PlaylistId = playlistId;
            CreatedAt = DateTime.UtcNow;
        }

        public void GetUrlProvider(string url)
        {
            string youtube = "youtube";
            string soundcloud = "soundcloud";

            if (url.Contains(youtube))
            {
                Provider = youtube;
                return;
            }

            if (url.Contains(soundcloud))
            {
                Provider = soundcloud;
                return;
            }

            throw new Exception($"Url: '{url}' has an invalid provider");
        }
    }
}
