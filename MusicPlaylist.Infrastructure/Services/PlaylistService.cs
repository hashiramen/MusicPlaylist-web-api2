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
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IAuthenticatorRepository _authenRepository;
        private readonly IMapper _mapper;
        public PlaylistService(IPlaylistRepository playlistRepository, IAuthenticatorRepository authenRepository, IMapper mapper)
        {
            _playlistRepository = playlistRepository;
            _authenRepository = authenRepository;
            _mapper = mapper;
        }

        public async Task<PlaylistDto> GetAsync(Guid id)
        {
            var playlist = await _playlistRepository.GetAsync(id);
           
            return  _mapper.Map<Playlist, PlaylistDto>(playlist);
        }

        public async Task<PlaylistDto> GetLatesAddedAsync()
        {
            var playlist = await _playlistRepository.GetAsync();

            return _mapper.Map<Playlist, PlaylistDto>(playlist);
        }

        public async Task RegisterAsync(Guid id, string name)
        {
            var authenticator = await _authenRepository.GetAsync(id);
            if(authenticator == null)
            {
                throw new Exception($"Authenticator with tag: '{id}' does not exists'");
            }
            var playlist = new Playlist(name, id);
            await _playlistRepository.AddAsync(playlist);
        }
    }
}
