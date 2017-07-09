using MusicPlaylist.Infrastructure.Commands;
using MusicPlaylist.Infrastructure.Commands.Authenticators;
using MusicPlaylist.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicPlaylist.Infrastructure.Handlers.Authenticators
{
    public class CreateAuthenticatorHandler : ICommandHandler<CreateAuthenticator>
    {
        private readonly IAuthenticatorService _authenService;
        public CreateAuthenticatorHandler(IAuthenticatorService authenService)
        {
            _authenService = authenService;
        }

        public async Task HandleAsync(CreateAuthenticator command)
        {
            await _authenService.RegisterAsync(command.Tag);
        }
    }
}
