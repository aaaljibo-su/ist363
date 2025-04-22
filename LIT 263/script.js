const game = document.getElementById("game");
    const virtueDisplay = document.getElementById("virtueDisplay");
    let virtuePoints = 0;

    const scenes = {
      start: {
        text: "You awaken in a dark forest. A figure named Virgil offers to guide you through the afterlife.",
        choices: [
          { text: "Follow Virgil", next: "inferno_lust" },
          { text: "Stay in the forest", next: "lost" }
        ]
      },
      lost: {
        text: "You wander aimlessly. Lost forever. Game Over.",
        choices: []
      },

      // Inferno
      inferno_lust: {
        text: "Circle of Lust: A beautiful spirit lures you with a promise of passion.",
        choices: [
          { text: "Resist the illusion", next: "inferno_gluttony", virtue: 1 },
          { text: "Give in", next: "inferno_gluttony", virtue: -1 }
        ]
      },
      inferno_gluttony: {
        text: "Circle of Gluttony: A feast appears. Spirits gorge endlessly.",
        choices: [
          { text: "Take only what you need", next: "inferno_fraud", virtue: 1 },
          { text: "Eat without restraint", next: "inferno_fraud", virtue: -1 }
        ]
      },
      inferno_fraud: {
        text: "Circle of Fraud: A lost soul asks if you’re a guide. Do you lie to feel powerful?",
        choices: [
          { text: "Tell the truth", next: "purgatory_entry", virtue: 1 },
          { text: "Lie to them", next: "purgatory_entry", virtue: -1 }
        ]
      },

      // Purgatory
      purgatory_entry: {
        text: "You reach the base of Mount Purgatory. Only the virtuous may climb.",
        choices: [
          { text: "Begin the climb", next: "purgatory_climb" },
          { text: "Wait and reflect", next: "purgatory_reflect" }
        ]
      },
      purgatory_climb: {
        text: "The climb is steep. You encounter a soul stuck in pride.",
        choices: [
          { text: "Help them see their error", next: "paradiso_gate", virtue: 1 },
          { text: "Climb past them", next: "paradiso_gate", virtue: 0 }
        ]
      },
      purgatory_reflect: {
        text: "You rest and reflect. Your humility earns divine favor.",
        choices: [
          { text: "Continue climb", next: "paradiso_gate", virtue: 1 }
        ]
      },

      // Paradiso
      paradiso_gate: {
        text: "You stand at the gate of Paradise. Beatrice asks: Which is the truest path to salvation?",
        choices: [
          { text: "Love", next: "ending_check", virtue: 1 },
          { text: "Knowledge", next: "ending_check" },
          { text: "Power", next: "ending_check", virtue: -1 }
        ]
      },

      // Endings
      ending_check: {
        text: "Your fate is judged...",
        choices: []
      }
    };

    function showScene(key) {
      const scene = scenes[key];
      if (!scene) return;

      if (key === "ending_check") {
        return checkEnding();
      }

      game.innerHTML = `<p>${scene.text}</p>`;
      scene.choices.forEach(choice => {
        const btn = document.createElement("div");
        btn.className = "choice";
        btn.textContent = choice.text;
        btn.onclick = () => {
          virtuePoints += choice.virtue || 0;
          virtueDisplay.textContent = `Virtue Points: ${virtuePoints}`;
          showScene(choice.next);
        };
        game.appendChild(btn);
      });
    }

    function checkEnding() {
      game.innerHTML = "";
      if (virtuePoints >= 4) {
        game.innerHTML = "<p>Beatrice smiles. Your virtue shines. You enter Paradise bathed in divine light. 🌟</p>";
      } else if (virtuePoints >= 2) {
        game.innerHTML = "<p>You are close but not ready. Remain in Purgatory until your soul ascends.</p>";
      } else {
        game.innerHTML = "<p>Your flaws pull you back into the depths. You fall into Inferno once more.</p>";
      }
      game.innerHTML += "<p><strong>The End.</strong></p>";
    }

    showScene("start");