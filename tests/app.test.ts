import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("HTTP app", () => {
    it("serves the health endpoint", async () => {
        const response = await request(app)
            .get("/api/v1/health")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toEqual({
            success: {
                message: "I am healthy.",
                data: "Server is running smoothly. All systems operational.",
            },
        });
    });

    it("returns a not-found error for an unknown route", async () => {
        const response = await request(app)
            .get("/api/v1/unknown")
            .expect("Content-Type", /json/)
            .expect(404);

        expect(response.body).toEqual({
            error: {
                status: 404,
                message: "This Route not Registered.",
            },
        });
    });

    it("serves the root status route", async () => {
        const response = await request(app).get("/").expect(200);

        expect(response.text).toBe("Application is Running. ");
    });
});
