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
        foreach (var client in Clients)
        {
            if (client.ConnectionId == connectionId)
            {
                return client;
            }
        }
        
        return null;
    }
}