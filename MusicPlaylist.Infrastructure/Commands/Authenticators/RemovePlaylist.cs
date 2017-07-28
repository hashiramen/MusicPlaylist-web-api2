using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Commands.Authenticators
{
    public class RemovePlaylist: ICommand
    {
        public Guid id { get; set; }
        public Guid authenticatorId { get; set; }
    }
}
