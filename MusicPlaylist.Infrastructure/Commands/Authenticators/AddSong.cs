using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Commands.Authenticators
{
    public class AddSong : ICommand
    {
        public Guid playlistId { get; set; }
        public string url { get; set; }
    }
}
