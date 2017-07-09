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
    public class AuthenticatorService : IAuthenticatorService
    {
        private readonly IAuthenticatorRepository _authenRepository;
        private readonly IMapper _mapper;
        public AuthenticatorService(IAuthenticatorRepository authenRepository, IMapper mapper)
        {
            _authenRepository = authenRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AuthenticatorDto>> GetAllAsync()
        {
            var authenticators = await _authenRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<Authenticator>, IEnumerable<AuthenticatorDto>>(authenticators);
        }

        public async Task<AuthenticatorDto> GetAsync(string tag)
        {
            var authenticator = await _authenRepository.GetAsync(tag);

            return _mapper.Map<Authenticator, AuthenticatorDto>(authenticator);
        }

        public async Task RegisterAsync(string tag)
        {
            var authenticator = await _authenRepository.GetAsync(tag);
            if(authenticator != null)
            {
                throw new Exception($"Authenticator with tag: '{tag}' already exists");
            }

            authenticator = new Authenticator(tag);
            await _authenRepository.AddAsync(authenticator);
        }
    }
}
