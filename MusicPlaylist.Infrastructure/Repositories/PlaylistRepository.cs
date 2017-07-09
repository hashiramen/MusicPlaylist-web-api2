﻿using MusicPlaylist.Core.Repositories;
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
    public class PlaylistRepository : IPlaylistRepository, IMusicPlayListRepository
    {
        private readonly MusicPlaylistContext _database;
        public PlaylistRepository(MusicPlaylistContext database)
        {
            _database = database;
        }

        public async Task AddAsync(Playlist playlist)
        {
            _database.Playlists.Add(playlist);
            await _database.SaveChangesAsync();
        }

        public async Task<IEnumerable<Playlist>> GetAllAsync(Guid authenticatorId)
            => await _database.Playlists.Include(x => x.Songs).Where(p => p.AuthenticatorId == authenticatorId).OrderByDescending(a => a.CreatedAt).AsQueryable().ToListAsync();

        public async Task<Playlist> GetAsync(Guid id)
           => await _database.Playlists.Include(x => x.Songs).FirstOrDefaultAsync(p => p.Id == id);

        public async Task RemoveAsync(Playlist playlist)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(Playlist playlist)
        {
            throw new NotImplementedException();
        }
    }
}