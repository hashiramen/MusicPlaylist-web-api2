using MusicPlaylist.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Core.Repositories
{
    public interface IAuthenticatorRepository : IRepository
    {
        Task<Authenticator> GetAsync(string tag);
        Task<Authenticator> GetAsync(Guid id);
        Task<IEnumerable<Authenticator>> GetAllAsync();
        Task AddAsync(Authenticator authenticator);
        Task RemoveAsync(string tag);
    }
}
