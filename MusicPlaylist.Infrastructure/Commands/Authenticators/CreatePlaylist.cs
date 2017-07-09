using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Commands.Authenticators
{
    public class CreatePlaylist : ICommand
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
