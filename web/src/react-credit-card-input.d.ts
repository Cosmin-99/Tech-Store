declare module "react-credit-card-input" {
    export default class SVG extends React.Component<
        {
            cardNumberInputProps: {
                value: string
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
                style?: object
                onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
                onFocus?: (e: React.FormEvent<HTMLInputElement>) => void
                onClick?(event: React.MouseEvent<HTMLElement>): void
                onMouseDown?(event: React.MouseEvent<HTMLElement>): void
                onMouseUp?(event: React.MouseEvent<HTMLElement>): void
                onMouseOver?(event: React.MouseEvent<HTMLElement>): void
                onMouseEnter?(event: React.MouseEvent<HTMLElement>): void
                onMouseLeave?(event: React.MouseEvent<HTMLElement>): void
                onMouseOut?(event: React.MouseEvent<HTMLElement>): void
                onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void
            }
            cardExpiryInputProps: {
                value: string
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
                style?: object
                onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
                onFocus?: (e: React.FormEvent<HTMLInputElement>) => void
                onClick?(event: React.MouseEvent<HTMLElement>): void
                onMouseDown?(event: React.MouseEvent<HTMLElement>): void
                onMouseUp?(event: React.MouseEvent<HTMLElement>): void
                onMouseOver?(event: React.MouseEvent<HTMLElement>): void
                onMouseEnter?(event: React.MouseEvent<HTMLElement>): void
                onMouseLeave?(event: React.MouseEvent<HTMLElement>): void
                onMouseOut?(event: React.MouseEvent<HTMLElement>): void
                onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void
            }
            cardCVCInputProps: {
                value: string
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
                style?: object
                onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
                onFocus?: (e: React.FormEvent<HTMLInputElement>) => void
                onClick?(event: React.MouseEvent<HTMLElement>): void
                onMouseDown?(event: React.MouseEvent<HTMLElement>): void
                onMouseUp?(event: React.MouseEvent<HTMLElement>): void
                onMouseOver?(event: React.MouseEvent<HTMLElement>): void
                onMouseEnter?(event: React.MouseEvent<HTMLElement>): void
                onMouseLeave?(event: React.MouseEvent<HTMLElement>): void
                onMouseOut?(event: React.MouseEvent<HTMLElement>): void
                onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void
                onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void
            }
            cardNumberInputRenderer?: (value: string) => React.ReactNode
            cardExpiryInputRenderer?: (value: string) => React.ReactNode
            cardCVCInputRenderer?: (value: string) => React.ReactNode
            onError?: (errorMessage: string) => void
            cardImageClassName?: string
            cardImageStyle?: object
            containerClassName?: string
            containerStyle?: object
            dangerTextClassName?: string
            dangerTextStyle?: object
            fieldClassName?: string
            fieldStyle?: object
            inputClassName?: string
            inputStyle?: object
            invalidClassName?: string
            invalidStyle?: object
            inputComponent?: string | React.ComponentType
            customTextLabels?: {
                invalidCardNumber?: string
                expiryError?: {
                    invalidExpiryDate?: string
                    monthOutOfRange?: string
                    yearOutOfRange?: string
                    dateOutOfRange?: string
                }
                invalidCvc?: string
                invalidZipCode?: string
                cardNumberPlaceholder?: string
                expiryPlaceholder?: string
                cvcPlaceholder?: string
                zipPlaceholder?: string
            }
        },
        any
    > { }
}