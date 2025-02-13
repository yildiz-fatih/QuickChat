using QuickChatApi.Models;

namespace QuickChatApi.Data;

public static class ClientRepository
{
    private static List<Client> Clients { get; } = new();

    public static void AddClient(Client client)
    {
        Clients.Add(client);
    }

    public static List<Client> GetClients()
    {
        return Clients;
    }

    public static void RemoveClient(Client client)
    {
        Clients.Remove(client);
    }

    public static Client GetClientByConnectionId(string connectionId)
    {
        return Clients.FirstOrDefault(client => client.ConnectionId == connectionId);
    }
    
    public static Client GetClientByUserName(string userName)
    {
        return Clients.FirstOrDefault(client => client.UserName == userName);
    }
}