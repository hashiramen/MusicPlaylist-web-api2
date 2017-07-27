using MusicPlaylist.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MusicPlaylist.Core.Domain;
using MusicPlaylist.Infrastructure.DatabaseContext;
using System.Data.Entity;

namespace MusicPlaylist.Infrastructure.Repositories
{
    public class AuthenticatorRepository : IAuthenticatorRepository, IMusicPlayListRepository
    {
        private readonly MusicPlaylistContext _database;

        public AuthenticatorRepository(MusicPlaylistContext database)
        {
            _database = database;
        }

        public async Task AddAsync(Authenticator authenticator)
        {
            _database.Authenticators.Add(authenticator);
            await _database.SaveChangesAsync();
        }

        public async Task<IEnumerable<Authenticator>> GetAllAsync()
            => await _database.Authenticators.Include(x => x.Playlists).ToListAsync();

        public async Task<Authenticator> GetAsync(string tag)
           => await _database.Authenticators.Include(x => x.Playlists).FirstOrDefaultAsync(x => x.Tag == tag);

        public async Task<Authenticator> GetAsync(Guid id)
            => await _database.Authenticators.Include(x => x.Playlists).FirstOrDefaultAsync(x => x.Id == id);

        public async Task RemoveAsync(string tag)
        {
            throw new NotImplementedException();
        }
    }
}
