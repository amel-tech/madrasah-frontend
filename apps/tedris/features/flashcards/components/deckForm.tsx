import React, { useState } from "react";

import { Button } from "@madrasah/ui/components/button";
import ATFormGroup from "@madrasah/ui/custom/form-group";
import ATFormGroupTextArea from "@madrasah/ui/custom/form-group-text-area";
import FlashCard from "./flashcard";
import { useRouter } from "next/navigation";
import { CaretLeftIcon } from "@madrasah/icons";

interface IDeckFormProps {
  id?: string;
}

function DeckForm({ id }: IDeckFormProps) {
  const router = useRouter();
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [frontLanguage, setFrontLanguage] = useState("");
  const [backLanguage, setBackLanguage] = useState("");

  const [cards, setCards] = useState([
    {
      front: "",
      frontNote: "",
      back: "",
      backNote: "",
      categories: "",
      frontLanguage: "",
      backLanguage: "",
      difficulty: "",
    },
  ]);

  const onChangeNestedField = (index: number, field: string, value: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      )
    );
  };

  const addCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        front: "",
        frontNote: "",
        back: "",
        backNote: "",
        categories: "",
        frontLanguage: "",
        backLanguage: "",
        difficulty: "",
      },
    ]);
  };

  const onSubmit = () => {
    const normalizedForm = {
      deckName,
      description,
      frontLanguage,
      backLanguage,
      cards,
    };

    const oldCards = JSON.parse(localStorage.getItem("flashCards")) || [];

    if (!id) {
      localStorage.setItem(
        "flashCards",
        JSON.stringify([...oldCards, normalizedForm])
      );
    } else {
      const updatedCards = oldCards.map((card: any) =>
        card.id === id ? normalizedForm : card
      );
      localStorage.setItem("flashCards", JSON.stringify(updatedCards));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2"
        >
          <CaretLeftIcon />
          Back
        </div>
        <Button onClick={onSubmit}>Save</Button>
      </div>

      <div className="mb-8">
        <h4 className="mb-6">DECK</h4>
        <ATFormGroup
          id="deckName"
          label="Deck Name"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <ATFormGroupTextArea
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ATFormGroup
          id={`frontLanguage`}
          label="Front Card's Language"
          placeholder="Turkce"
          value={frontLanguage}
          onChange={(e) => setFrontLanguage(e.target.value)}
        />
        <ATFormGroup
          id={`backLanguage`}
          label="Back Card's Language"
          placeholder="Arapca"
          value={backLanguage}
          onChange={(e) => setBackLanguage(e.target.value)}
        />
      </div>

      <div>
        <h4 className="mb-4">CARDS</h4>
        {cards.map((card, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-8">
            <FlashCard>
              <ATFormGroupTextArea
                id={`${index}-front`}
                placeholder="Front Text"
                value={card.front}
                onChange={(e) =>
                  onChangeNestedField(index, "front", e.target.value)
                }
              />
              <ATFormGroupTextArea
                id={`${index}-frontNote`}
                placeholder="Front Note"
                value={card.frontNote}
                onChange={(e) =>
                  onChangeNestedField(index, "frontNote", e.target.value)
                }
              />
            </FlashCard>
            <FlashCard>
              <ATFormGroupTextArea
                id={`${index}-back`}
                placeholder="Back Text"
                value={card.back}
                onChange={(e) =>
                  onChangeNestedField(index, "back", e.target.value)
                }
              />
              <ATFormGroupTextArea
                id={`${index}-backNote`}
                placeholder="Back Note"
                value={card.backNote}
                onChange={(e) =>
                  onChangeNestedField(index, "backNote", e.target.value)
                }
              />
            </FlashCard>
            <div className="card-actions">
              <ATFormGroup
                id={`${index}-categories`}
                label="Categories"
                placeholder="hadith abdest abdestin sunnetleri"
                value={card.categories}
                onChange={(e) =>
                  onChangeNestedField(index, "categories", e.target.value)
                }
              />
              <ATFormGroup
                id={`${index}-difficulty`}
                label="Difficulty"
                placeholder="Zorluk"
                value={card.difficulty}
                onChange={(e) =>
                  onChangeNestedField(index, "difficulty", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" className="w-full" onClick={addCard}>
          Add Card
        </Button>
      </div>
    </>
  );
}

export default DeckForm;
