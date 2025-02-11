import {IProduct} from "../types";
import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";

const categoryColor = <Record<string, string>> { 
    "софт-скил": '_soft',
    "другое": '_other', 
    "дополнительное": '_additional',
    "кнопка": '_button',
    "хард-скил": '_hard',
    };

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardCatalog extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _price?: HTMLElement;
  protected _category?: HTMLElement;
  protected _categoryColor = categoryColor;

  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
      super(container);
      this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
      this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
      this._button = container.querySelector(`gallery__item`);
      this._price = container.querySelector(`.${blockName}__price`);
      this._category = container.querySelector(`.${blockName}__category`);

      if (actions?.onClick) {
          if (this._button) {
              this._button.addEventListener('click', actions.onClick);
          } else {
              container.addEventListener('click', actions.onClick);
          }
      }
  }

  set id(value: string) {
      this.container.dataset.id = value;
  }

  set category(value: string) {
    this.setText(this._category, value);
    this._category.className =`card__category card__category${this._categoryColor[value]}`;
    }

  set title(value: string) {
      this.setText(this._title, value);
  }

  set image(value: string) {
      this.setImage(this._image, value, this.title)
  }
  
  set price(value: string) {
    if(value){
        this.setText(this._price, value + " синапсов");
    }
    else{
        this.setText(this._price, "Бесценно");
    }
}
}

export class CardPreview extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _price?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _categoryColor = categoryColor;


    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);
        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._price = container.querySelector(`.${blockName}__price`);
        this._description = container.querySelector(`.${blockName}__text`);
        this._category = container.querySelector(`.${blockName}__category`);
        this._button = container.querySelector(`.${blockName}__button`);
        

        this._button.addEventListener('click', actions.onClick);
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }
  
    set title(value: string) {
        this.setText(this._title, value);
    }
  
    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
        this._category.className =`card__category card__category${this._categoryColor[value]}`;
        
    }

    set price(value: string) {
        if(value){
            this.setText(this._price, value + " синапсов");
        }
        else{
            this.setText(this._price, "Бесценно");
        }
    }

    set valid(value: boolean){
        this._button.disabled = !value;
    }  
}