using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Commands.Authenticators
{
    public class CreateAuthenticator : ICommand
    {
        public string Tag { get; set; }
    }
}
