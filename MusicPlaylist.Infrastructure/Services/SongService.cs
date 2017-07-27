using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MusicPlaylist.Infrastructure.Dto;
using MusicPlaylist.Core.Repositories;
using AutoMapper;
using MusicPlaylist.Core.Domain;

namespace MusicPlaylist.Infrastructure.Services
{
    public class SongService : ISongService
    {
        private readonly ISongRepository _songRepository;
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IMapper _mapper;
        public SongService(ISongRepository songRepository, IPlaylistRepository playlistRepository, IMapper mapper)
        {
            _songRepository = songRepository;
            _playlistRepository = playlistRepository;
            _mapper = mapper;
        }

        public async Task AddAsync(string url, string author, string title, Guid playlistId)
        {
            var playlist = await _playlistRepository.GetAsync(playlistId);
            if(playlist == null)
            {
                throw new Exception($"Playlist with id: '{playlistId}' does not exists");
            }

            var song = new Song(url, author, title, playlistId);
            await _songRepository.AddAsync(song);
        }

        public async Task<IEnumerable<SongDto>> GetAllAsync(Guid playlistId)
        {
            var songs = await _songRepository.GetAllAsync(playlistId);

            return _mapper.Map<IEnumerable<Song>, IEnumerable<SongDto>>(songs);
        }

        public async Task<SongDto> GetLatestAsync(Guid playlistId)
        {
            var song = await _songRepository.GetLatestAsync(playlistId);
            if(song == null)
            {
                throw new Exception($"Playlist with id ${playlistId} does not exists");
            }

            return _mapper.Map<Song, SongDto>(song);
        }

        public async Task RemoveAsync(Guid songId, Guid playlistId)
        {
            var song = await _songRepository.GetAsync(songId, playlistId);
            if (song == null)
            {
                throw new ArgumentException($"Song with playlist id: {playlistId} or song id: {songId}, doest not exists");
            }

            await _songRepository.RemoveAsync(song);
        }
    }
}
