using Microsoft.AspNetCore.SignalR;
using QuickChatApi.Data;
using QuickChatApi.Models;

namespace QuickChatApi.Hubs;

public class ChatHub : Hub
{
    public async Task GetUserName(string userName)
    {
        var client = new Client()
        {
            ConnectionId = Context.ConnectionId,
            UserName = userName
        };
        ClientRepository.AddClient(client);
        
        await Clients.Others.SendAsync("UserJoined", userName);

        await Clients.All.SendAsync("UserListUpdate", ClientRepository.GetClients());
    }
}