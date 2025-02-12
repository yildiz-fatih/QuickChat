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
}