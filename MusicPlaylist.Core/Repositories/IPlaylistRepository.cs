using MusicPlaylist.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Repositories
{
    public interface IPlaylistRepository : IRepository
    {
        Task<Playlist> GetAsync(Guid id, Guid authenticatorId);
        Task<Playlist> GetAsync(Guid id);
        Task<Playlist> GetAsync();
        Task<IEnumerable<Playlist>> GetAllAsync(Guid authenticatorId);
        Task AddAsync(Playlist playlist);
        Task UpdateAsync(Playlist playlist);
        Task RemoveAsync(Playlist playlist);
    }
}
