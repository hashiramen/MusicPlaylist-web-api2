using MusicPlaylist.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MusicPlaylist.App.Controllers
{
    public abstract class ApiBaseController : ApiController
    {
        protected readonly ICommandDispatcher _CommandDispatcher;
        public ApiBaseController(ICommandDispatcher commandDispatcher)
        {
            _CommandDispatcher = commandDispatcher;
        }
    }
}