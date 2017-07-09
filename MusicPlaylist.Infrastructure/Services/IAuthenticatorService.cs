using MusicPlaylist.Infrastructure.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Services
{
    public interface IAuthenticatorService : IService
    {
        Task<IEnumerable<AuthenticatorDto>> GetAllAsync();
        Task<AuthenticatorDto> GetAsync(string tag);
        Task RegisterAsync(string tag);
    }
}
