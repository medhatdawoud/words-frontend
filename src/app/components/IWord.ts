export interface Word {
    lang        : string,
    word        : string,
    synonym     : Array<string>,
    type        : string,
    pronounce   : string,
    description : string,
    soundUrl    : string,
    tags        : Array<string>,
    videos      : Array<string>,
    examples    : Array<string>,
    images      : Array<string>
}