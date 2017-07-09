using MusicPlaylist.Infrastructure.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Services
{
    public interface ISongService : IService
    {
        Task<IEnumerable<SongDto>> GetAllAsync(Guid playlistId);
        Task AddAsync(string url, Guid playlistId);
    }
}
