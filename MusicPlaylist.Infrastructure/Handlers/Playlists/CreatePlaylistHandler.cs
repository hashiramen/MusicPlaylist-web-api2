using MusicPlaylist.Infrastructure.Commands;
using MusicPlaylist.Infrastructure.Commands.Authenticators;
using MusicPlaylist.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Handlers.Playlists
{
    public class CreatePlaylistHandler : ICommandHandler<CreatePlaylist>
    {
        private readonly IPlaylistService _playlistService;
        public CreatePlaylistHandler(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        public async Task HandleAsync(CreatePlaylist command)
        {
            await _playlistService.RegisterAsync(command.Id, command.Name);
        }
    }
}
