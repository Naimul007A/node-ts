class ServerService {
    public async getApiHealth(): Promise<{ message: string; data: string }> {
        return {
            message: "I am healthy.",
            data: "Server is running smoothly. All systems operational.",
        };
    }
}

export default new ServerService();
