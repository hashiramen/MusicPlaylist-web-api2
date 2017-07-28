using MusicPlaylist.Infrastructure.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Services
{
    public interface IPlaylistService : IService
    {
        Task<PlaylistDto> GetAsync(Guid id);
        Task RegisterAsync(Guid id, string name);
        Task<PlaylistDto> GetLatesAddedAsync();
        Task RemoveAsync(Guid id, Guid authenticatorId);
    }
}
