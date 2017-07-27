using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Commands.Authenticators
{
    public class RemoveSong : ICommand
    {
        public Guid id { get; set; }
        public Guid playlistId { get; set; }
    }
}
