using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Dto
{
    public class SongDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public string Provider { get; set; }
    }
}
