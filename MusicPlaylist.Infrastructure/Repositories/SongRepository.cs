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
    public class SongRepository : ISongRepository, IMusicPlayListRepository
    {
        private readonly MusicPlaylistContext _database;
        public SongRepository(MusicPlaylistContext database)
        {
            _database = database;
        }

        public async Task<IEnumerable<Song>> GetAllAsync(Guid playlistId)
            => await _database.Songs.Where(x => x.PlaylistId == playlistId).ToListAsync();

        public async Task AddAsync(Song song)
        {
            _database.Songs.Add(song);
            await _database.SaveChangesAsync();
        }

        public async Task RemoveAsync(Song song)
        {
           _database.Songs.Remove(song);
           await _database.SaveChangesAsync();
        }

        public Task UpdateAsync(Song song)
        {
            throw new NotImplementedException();
        }

        public async Task<Song> GetLatestAsync(Guid playlistId)
            => await _database.Songs.Where(s => s.PlaylistId == playlistId).OrderByDescending(d => d.CreatedAt).FirstOrDefaultAsync();

        public async Task<Song> GetAsync(Guid songId, Guid playlistId)
            => await _database.Songs.Where(s => s.Id == songId && s.PlaylistId == playlistId).FirstOrDefaultAsync();
    }
}
