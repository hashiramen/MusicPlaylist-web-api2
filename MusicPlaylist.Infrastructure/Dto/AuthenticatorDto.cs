using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Dto
{
    public class AuthenticatorDto
    {
        public Guid Id { get; set; }
        public string Tag { get; set; }
        public IEnumerable<PlaylistDto> Playlists { get; set; }
    }
}
