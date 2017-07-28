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
    public class RemovePlaylistHandler : ICommandHandler<RemovePlaylist>
    {
        private readonly IPlaylistService _playlistService;
        public RemovePlaylistHandler(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        public async Task HandleAsync(RemovePlaylist command)
        {
            await _playlistService.RemoveAsync(command.id, command.authenticatorId);
        }
    }
}
