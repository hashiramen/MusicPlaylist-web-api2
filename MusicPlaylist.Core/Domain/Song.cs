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
        public string Unique { get; protected set; }
        public string Title { get; protected set; }
        public string Author { get; protected set; }
        public Guid PlaylistId { get; protected set; }
        public Playlist Playlist { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        private const string youtube = "youtube";
        private const string soundcloud = "soundcloud";

        private bool IsEmbed = false;

        public Song()
        {

        }

        public Song(string url, string author, string title, Guid playlistId)
        {
            Id = Guid.NewGuid();
            ValidateAndSetAuthorAndTitle(title, author);

            //set url provider
            GetUrlProvider(url);
            SetUnique(url);
            SetUrl(url);
            PlaylistId = playlistId;
            CreatedAt = DateTime.UtcNow;
        }

        public void ValidateAndSetAuthorAndTitle(string title, string author)
        {
            if (title == null || author == null)
            {
                throw new ArgumentNullException("Title and/or Author name cannot be NULL");
            }

            if (String.IsNullOrWhiteSpace(title) || String.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentException($"Invalid author or playlist name");
            }

            Title = title;
            Author = author;
        }

        public void GetUrlProvider(string url)
        {
            if(url == null)
            {
                throw new ArgumentNullException("Url cannot be NULL");
            }

            if (String.IsNullOrWhiteSpace(url))
            {
                throw new ArgumentException($"Invalid url");
            }

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

        public void SetUnique(string url)
        {
            switch (Provider)
            {
                case youtube:
                    if (url.Contains("embed"))
                    {
                        Unique = (url.Substring(url.LastIndexOf("/") + 1)).Replace("/", "");
                        IsEmbed = true;
                        return;
                    }

                    Unique = (url.Substring(url.LastIndexOf("=") + 1)).Replace("/", "");
                    break;
                case soundcloud:
                    Unique = soundcloud;
                    break;
            }
        }

        public void SetUrl(string url)
        {
            switch (Provider)
            {
                case youtube:
                    Url = $"https://www.youtube.com/embed/{Unique}?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0";
                    break;
                case soundcloud:
                    Url = $"{url}";
                    break;
            }
        }

    }
}
