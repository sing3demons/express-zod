import http from 'http';
class Server {
    constructor(app) {
        this.app = app;
        this.start = (port) => {
            const server = http.createServer(this.app).listen(port, () => {
                console.log(`Server is running on port: ${port}, PID: ${process.pid}`);
            });
            process.on('SIGTERM', () => {
                console.log('SIGTERM signal received.');
                server.close(() => {
                    console.log('Http server closed.');
                    process.exit(0);
                });
            });
            process.on('SIGINT', () => {
                console.log('SIGINT signal received.');
                server.close(() => {
                    console.log('Http server closed.');
                    process.exit(0);
                });
            });
        };
    }
}
export default Server;
//# sourceMappingURL=server.js.map