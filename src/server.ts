import app from "./app";

const port = process.env.PORT || 3502;

app.listen(port, () => {
    console.log(`Application is running at port: http://localhost:${port}`);
});
