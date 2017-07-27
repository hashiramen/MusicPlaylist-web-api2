using MusicPlaylist.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Repositories
{
    public interface ISongRepository : IRepository
    {
        Task<IEnumerable<Song>> GetAllAsync(Guid playlistId);
        Task<Song> GetLatestAsync(Guid playlistId);
        Task<Song> GetAsync(Guid songId, Guid playlistId);
        Task AddAsync(Song song);
        Task UpdateAsync(Song song);
        Task RemoveAsync(Song song);
    }
}
