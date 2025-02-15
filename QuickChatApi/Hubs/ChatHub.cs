using Microsoft.AspNetCore.SignalR;
using QuickChatApi.Data;
using QuickChatApi.Models;

namespace QuickChatApi.Hubs;

public class ChatHub : Hub
{
    // When a user connects
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
    
    // When a user disconnects
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        ClientRepository.RemoveClient(ClientRepository.GetClientByConnectionId(Context.ConnectionId));
        
        await Clients.All.SendAsync("UserListUpdate", ClientRepository.GetClients());
    }
    
    public async Task SendMessage(string message, string targetUserName)
    {
        var senderUserName = ClientRepository.GetClientByConnectionId(Context.ConnectionId).UserName;
        
        if (targetUserName == "all")
        {
            await Clients.All.SendAsync("NewMessage", senderUserName, "all", message);
        }
        else
        {
            var targetClient = ClientRepository.GetClientByUserName(targetUserName);
            
            await Clients.Client(targetClient.ConnectionId).SendAsync("NewMessage", senderUserName, targetUserName, message);
        }
    }
}