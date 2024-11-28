class Agent:
    def __init__(self) -> None:
        self.context = ""
        self.prompt = ""
        pass

    def update_prompt(self, prompt: str) -> None:
        self.prompt = prompt

    def update_context(self, context: str) -> None:
        self.context = context