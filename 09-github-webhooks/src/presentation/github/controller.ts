import { Request, Response } from "express";

import { DiscordService } from "../services/discord.service";
import { GitHubService } from "../services/github.service";

export class GitHubController {

    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService()
    ) {}

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header("x-github-event") ?? "unknown";
        const payload = req.body;

        let message: string;

        switch(githubEvent) {
            case "start":
                message = this.githubService.onStar(payload);
            break;

            case "issues":
                message = this.githubService.onIssue(payload);
            break;

            default:
                message = `Unknown event: ${ githubEvent }`;
        }

        this.discordService.notify(message)
            .then(() => res.status(202).json("Accepted"))
            .catch(() => res.status(500).json({ error: "Internal server error" }));
    }
}