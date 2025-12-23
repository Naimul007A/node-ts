class ServerService {
    public async getApiHealth(): Promise<{ message: string; data: string }> {
        return {
            message: "I am healthy.",
            data: "Server is running smoothly.",
        };
    }
}

export default new ServerService();
